package bloodmate.model.repository;

import bloodmate.model.entity.Hba1cEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Hba1cRepository extends JpaRepository<Hba1cEntity, Integer> {
}
