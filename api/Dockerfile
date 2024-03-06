FROM python:3.11.0-slim

ENV PYTHONUNBUFFERED 1

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup --system app && adduser --system --group app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY requirements.txt $APP_HOME
RUN python -m pip install --upgrade pip 
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R app:app $APP_HOME
RUN cd ${APP_HOME} && chmod +x migrate.sh

# change to the app user
USER app

EXPOSE 8001

CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8001"]

# az container create --resource-group RG_KUILM --name usba-bare-api --image acrusba.azurecr.io/bare-api --cpu 1 --memory 1 --registry-login-server acrusba.azurecr.io --registry-username acrusba --registry-password zrFNfO5HvCSTgLGS80zoPQi9OQoH9ueE/UK+8vMWQU+ACRCBhoDO --ip-address Public --ports 8001