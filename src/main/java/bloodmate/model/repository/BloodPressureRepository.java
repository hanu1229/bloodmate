package bloodmate.model.repository;

import bloodmate.model.entity.BloodPressureEntity;
import bloodmate.model.entity.BloodSugarEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressureEntity, Integer> {

    /// 혈압 정보 전체 불러오기 - R
    // @Query(value = "select * from user_blood_pressure where user_id = :userId order by measured_at DESC", nativeQuery = true)
    // List<BloodPressureEntity> findByUserIdToBloodPressure(@Param("userId") int userId);

    /// 혈압 정보 전체 불러오기 - R
    Page<BloodPressureEntity> findByUserEntity_userId(@Param("userId") int userId, Pageable pageable);

    /// 혈압 정보 조건 불러오기 (측정 상황 O) - R
    @Query(
            value = """
                    select * from user_blood_pressure
                    where user_id = :userId and measured_at >= :startDateTime and measured_at <= :endDateTime
                    and measurement_context_id = :context
                    """,
            countQuery = """
                        select count(*) from user_blood_pressure
                        where user_id = :userId and measured_at >= :startDateTime and measured_at <= :endDateTime
                        and measurement_context_id = :context
                        """,
            nativeQuery = true
    )
    Page<BloodPressureEntity> findByContextToDateToBloodPressure(
            @Param("userId") int userId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime,
            @Param("context") int context,
            Pageable pageable
    );

    /// 혈압 정보 조건 불러오기 (측정 상황 X) - R
    @Query(
            value = """
                    select * from user_blood_pressure
                    where user_id = :userId and measured_at >= :startDateTime and measured_at <= :endDateTime
                    """,
            countQuery = """
                        select count(*) from user_blood_pressure
                        where user_id = :userId and measured_at >= :startDateTime and measured_at <= :endDateTime
                        """,
            nativeQuery = true
    )
    Page<BloodPressureEntity> findByDateToBloodPressure(
            @Param("userId") int userId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime,
            Pageable pageable
    );

    /// 혈압 측정 상황별 15개 최소, 최대 평균 불러오기 - R
    @Query(value = "select * from user_blood_pressure where user_id = :userId and measurement_context_id = :measurementContextId order by measured_at limit 15", nativeQuery = true)
    List<BloodPressureEntity> findAverage(@Param("userId") int userId, @Param("measurementContextId") int measurementContextId);


}
