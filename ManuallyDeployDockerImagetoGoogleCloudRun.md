
gcloud auth login
gcloud config set project hello-welcome-407012
gcloud auth configure-docker

docker buildx build -t hello-welcome-server-image --platform linux/amd64 .  
-- docker build -t hello-welcome-server-image .  
docker tag hello-welcome-server-image gcr.io/hello-welcome-407012/hello-welcome-server-image
docker push gcr.io/hello-welcome-407012/hello-welcome-server-image


gcloud logs read --project=hello-welcome-407012 --service=hello-welcome-server-image-00001-wzl --region=REGION
