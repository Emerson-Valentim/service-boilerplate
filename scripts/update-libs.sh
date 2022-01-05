echo "Updating node_modules in root";
rm -rf node_modules; yarn;

cd services;

for d in */ ; do
	echo "Updating node_modules in $d";
    rm -rf $d/node_modules;
    cd $d; yarn; cd ..;
done

cd ..;