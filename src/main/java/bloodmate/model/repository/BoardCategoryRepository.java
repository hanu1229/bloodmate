package bloodmate.model.repository;

import bloodmate.model.entity.BoardCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardCategoryRepository extends JpaRepository<BoardCategoryEntity, Integer> {

    @Query(value = "select * from board_category where board_category_title = :boardCategoryTitle", nativeQuery = true)
    BoardCategoryEntity findByTitle(@Param("boardCategoryTitle") String boardCategoryTitle);

}
