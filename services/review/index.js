const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const reviews = require('./reviews.json');

const packageDefinition = protoLoader.loadSync('proto/review.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const reviewProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do ReviewService
server.addService(reviewProto.ReviewService.service, {
    GetReviews: (payload, callback) => {
        // Filtra as avaliações do produto pedido
        const productReviews = reviews.filter((review) => review.productId == payload.request.id);

        callback(null, {
            reviews: productReviews,
        });
    },
});

// 0.0.0.0 para o serviço ser acessível de fora do container Docker
server.bindAsync('0.0.0.0:3003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Review Service running at http://127.0.0.1:3003');
    server.start();
});
