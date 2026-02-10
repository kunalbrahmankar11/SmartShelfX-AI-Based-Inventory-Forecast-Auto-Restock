package AI.SmartShelfXInventory.controller;

import AI.SmartShelfXInventory.model.Product;
import AI.SmartShelfXInventory.model.Transaction;
import AI.SmartShelfXInventory.repository.ProductRepository;
import AI.SmartShelfXInventory.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;

    // ✅ Record a Stock-IN or Stock-OUT transaction
    @PostMapping
    public Transaction recordTransaction(@RequestBody Transaction transaction) {
        Product product = productRepository.findById(transaction.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Update product stock
        if ("IN".equalsIgnoreCase(transaction.getType())) {
            product.setCurrentStock(product.getCurrentStock() + transaction.getQuantity());
        } else if ("OUT".equalsIgnoreCase(transaction.getType())) {
            product.setCurrentStock(product.getCurrentStock() - transaction.getQuantity());
        }

        productRepository.save(product);

        // Add timestamp
        transaction.setTimestamp(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    // ✅ Get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // ✅ Get transactions by Product
    @GetMapping("/{productId}")
    public List<Transaction> getTransactionsByProduct(@PathVariable String productId) {
        return transactionRepository.findByProductId(productId);
    }
}
