package AI.SmartShelfXInventory.repository;

import AI.SmartShelfXInventory.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByProductId(String productId);
}
