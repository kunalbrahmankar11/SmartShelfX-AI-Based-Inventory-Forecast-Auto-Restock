package AI.SmartShelfXInventory.repository;

import AI.SmartShelfXInventory.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
