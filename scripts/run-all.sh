cd services;

SERVICES=("consumer" "notification" "worker" "api")

for d in ${SERVICES[@]} ; do
		echo "Running $d"
    cd $d;
		yarn start:docker;
    cd ..;
done