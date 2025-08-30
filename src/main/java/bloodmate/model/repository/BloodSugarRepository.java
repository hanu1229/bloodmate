package bloodmate.model.repository;

import bloodmate.model.entity.BloodSugarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodSugarRepository extends JpaRepository<BloodSugarEntity, Integer> {
}
