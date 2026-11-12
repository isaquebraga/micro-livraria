# Imagem base derivada do Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Comando para copiar os arquivos para a pasta /app da imagem
COPY . /app

# Comando para instalar as dependências
RUN npm install

# Porta usada pelo serviço de avaliações
EXPOSE 3003

# Comando para inicializar (executar) a aplicação
CMD ["node", "/app/services/review/index.js"]
