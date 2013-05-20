from waitress import serve
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.static import static_view

from pyramid import httpexceptions

from pyramid.events import NewRequest
from pyramid.events import subscriber

from pyramid.session import UnencryptedCookieSessionFactoryConfig

import json
import os

# store items in memory 
STORAGE = {}
id_counter = 1 

def _get_expanded_item(iid_str):
    iid = int(iid_str)
    if iid in STORAGE: 
        result = STORAGE[iid].copy()
        result['id'] = iid
        return result
    return None 

def item_get(request):
    item = _get_expanded_item(request.matchdict["iid"])
    if item:
        return Response(body=json.dumps(item), content_type='application/json')
    return httpexceptions.HTTPNotFound() 

def item_post(request): 
    global id_counter

    body = request.body
    data = json.loads(request.body)
    new_id = id_counter
    id_counter += 1 
    STORAGE[new_id] = data
    new_item = _get_expanded_item(new_id)
    return httpexceptions.HTTPCreated(body=json.dumps(new_item), content_type='application/json')

def item_put(request):
    pass 

def item_delete(request): 
    iid = int(request.matchdict["iid"])
    del STORAGE[iid] 
    return Response(status=204)

def item_list(request): 
    result = [_get_expanded_item(k) for k in STORAGE.keys()]
    return Response(body = json.dumps(result), content_type='application/json')

if __name__ == '__main__':
    config = Configurator()

    # set up a static route to the frontend application 
    config.add_route('app_route', '/app/*subpath')
    this_dir = os.path.split(os.path.abspath(__file__))[0]
    app_dir = os.path.join(this_dir, 'app')
    app_static =  static_view(app_dir, use_subpath=True, cache_max_age=0)
    config.add_view(app_static, route_name='app_route')

    # configure the hello world route 
    config.add_route('item_col_route', "item")
    config.add_route('item_entity_route', "item/{iid}")
    config.add_view(view=item_post,   route_name="item_col_route",    request_method="POST")
    config.add_view(view=item_get,    route_name="item_entity_route", request_method="GET")
    config.add_view(view=item_put,    route_name="item_entity_route", request_method="PUT")
    config.add_view(view=item_delete, route_name="item_entity_route", request_method="DELETE")
    config.add_view(view=item_list,   route_name="item_col_route",    request_method="GET")

    app = config.make_wsgi_app()
    serve(app, host='0.0.0.0', port=8080)
