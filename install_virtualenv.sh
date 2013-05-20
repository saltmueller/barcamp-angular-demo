#!/bin/bash 

TARGET_ENV=py-local
VE_VERSION="1.9.1"
VIRTUALENV_DIR="virtualenv-$VE_VERSION"
VIRTUALENV_PATH="$VIRTUALENV_DIR.tar.gz"
VIRTUALENV_URL="https://pypi.python.org/packages/source/v/virtualenv/$VIRTUALENV_PATH"

echo -e "Creating virtualenv in $TARGET_ENV."

curl -O $VIRTUALENV_URL
tar xvfz $VIRTUALENV_PATH
cd $VIRTUALENV_DIR
python virtualenv.py --no-site-packages "../$TARGET_ENV"
cd ..
rm -rf "$VIRTUALENV_DIR" "$VIRTUALENV_PATH"

echo -e "Successfully created virtual env in $TARGET_ENV\n\n"

if [ -f "requirements.txt" ] 
    then 
       echo -e "Installing dependencies:"
       source $TARGET_ENV/bin/activate
       pip install --upgrade -r requirements.txt 
       echo -e "Done installing dependencies\n\n\n"
fi

\rm -rf "$VIRTUALENV_DIR*"

echo -e "To activate the virtualenv run:\n\n"
echo -e "     source $TARGET_ENV/bin/activate\n\n"

echo -e "To verify the client works and your app is configured correctly"
echo -e "run the 'get_token.py' script to retrieve an oauth session token.\n\n"
