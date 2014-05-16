#### Example code for the Angular.js talk at BarcampRDU 2013

*Note:* This is example code to show how certain concepts work, but quite unrefined otherwise. 


There are two examples. One is a CRUD example that gives a basic idea of how to access REST resources from Angular.
The second example shows a very basic directive (countdown clock). 

Thereis a small backend contained in the 'server.py' file which provides the REST end-points for the first example
and also serves the app.

It depends on the 'pyramid' and 'waitress' packages, either following the instructions below to set up a self contained
virtualenv or use your own. 

Run the following in a shell to get this work (tested on Linux, but should run on MacOs as well):

    $ ./install_virtualenv.sh 
    $ source py-local/bin/activate
    $ python server.py 


The above first installs a self contained virtual env and install the dependencies in it. Then it activates the virtualenv and
starts the server. After that the app is avaialbe at [http://localhost:8080/app/](http://localhost:8080/app/).
