package bloodmate.model.repository;

import bloodmate.model.entity.MeasurementContextEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementContextRepository extends JpaRepository<MeasurementContextEntity, Integer> {
}
