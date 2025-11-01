package bloodmate.model.repository;

import bloodmate.model.entity.MeasurementContextEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementContextRepository extends JpaRepository<MeasurementContextEntity, Integer> {

    // id 찾기
    @Query(value = "select measurement_context_id from measurement_context where measurement_context_code = :code", nativeQuery = true)
    int findByMCId(@Param("code") String code);

}
