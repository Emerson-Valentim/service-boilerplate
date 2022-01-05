cd services;

SERVICES=("consumer" "notification" "worker" "api")

for d in ${SERVICES[@]} ; do
		echo "Stopping $d"
    cd $d;
		docker-compose down;
    cd ..;
done