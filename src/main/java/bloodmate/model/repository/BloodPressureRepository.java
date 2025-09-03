package bloodmate.model.repository;

import bloodmate.model.entity.BloodPressureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressureEntity, Integer> {
}
