package bloodmate.model.repository;

import bloodmate.model.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    // @Modifying : update/delete 쿼리라는 것을 알리는 어노테이션
    @Modifying
    @Query(value = "update board_post set board_post_view = board_post_view + 1 where board_post_id = :boardPostId", nativeQuery = true)
    int increasePostView(@Param("boardPostId") int boardPostId);

    /// 게시물 전체 출력 - R
    @Query(value = "select * from board_post where board_post_state = 1", nativeQuery = true)
    List<BoardEntity> findAllByBoardStateIsNormal();

    /// 게시물 카테고리별 전체 출력 - R
    @Query(value = "select * from board_post where board_category_id = :boardCategoryId and board_post_state = 1", nativeQuery = true)
    List<BoardEntity> findAllCategory(@Param("boardCategoryId") int boardCategoryId);

    /// 게시물 상세 보기 - R
    @Query(value = "select count(*) from board_post where board_post_id = :boardPostId and board_post_state = 1", nativeQuery = true)
    int existBoardPostStateIsNormal(@Param("boardPostId") int boardPostId);

    /// 게시물 수정 - U
    @Query(value = "select * from board_post where board_post_id = :boardPostId and user_id = :userId", nativeQuery = true)
    Optional<BoardEntity> findByBoardPostIdToUserId(@Param("boardPostId") int boardPostId, @Param("userId") int userId);

}
