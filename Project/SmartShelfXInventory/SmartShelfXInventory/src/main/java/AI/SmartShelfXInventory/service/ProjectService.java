package AI.SmartShelfXInventory.service;

import AI.SmartShelfXInventory.model.Project;
import AI.SmartShelfXInventory.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(String id, Project updatedProject) {
        Optional<Project> existing = projectRepository.findById(id);
        if (existing.isPresent()) {
            Project project = existing.get();
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            project.setStatus(updatedProject.getStatus());
            return projectRepository.save(project);
        }
        return null;
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }
}
