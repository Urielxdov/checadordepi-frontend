#imagen base
FROM node:24-bookworm

#directorio de trabajo
WORKDIR /chdepi_front

#copiar codigo
COPY . .

#comando para ejecutar
ENTRYPOINT ["npm","run","dev"]