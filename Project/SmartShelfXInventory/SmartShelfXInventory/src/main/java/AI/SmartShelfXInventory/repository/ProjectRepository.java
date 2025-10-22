package AI.SmartShelfXInventory.repository;

import AI.SmartShelfXInventory.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {
}
