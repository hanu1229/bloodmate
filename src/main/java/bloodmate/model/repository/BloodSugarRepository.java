package bloodmate.model.repository;

import bloodmate.model.entity.BloodSugarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BloodSugarRepository extends JpaRepository<BloodSugarEntity, Integer> {

    /// 혈당 정보 전체 불러오기 - R
    @Query(value = "select * from user_blood_sugar where user_id = :userId", nativeQuery = true)
    List<BloodSugarEntity> findByUserIdToBloodSugar(@Param("userId") int userId);

    /// 혈당 정보 조건 불러오기(조건 : 날짜) - R
    @Query(
            value = "select * from user_blood_sugar where user_id = :userId and measured_at >= :start and measured_at < :end",
            nativeQuery = true
    )
    List<BloodSugarEntity> findByDateToBloodSugar(@Param("userId") int userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);


}
