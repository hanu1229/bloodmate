package bloodmate.model.dto.board;

import bloodmate.model.dto.CommentDto;
import bloodmate.model.entity.BoardEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class BoardResponseDto {

    /// 게시물 번호 PK
    private int boardPostId;
    /// 게시물 제목
    private String boardPostTitle;
    /// 게시물 내용
    private String boardPostContent;
    /// 게시물 조회수
    private int boardPostView;
    /// 게시물 상태 --> 0 : 삭제, 1 : 정상
    private int boardPostState;
    /// 작성일
    private LocalDateTime createdAt;
    /// 수정일
    private LocalDateTime updatedAt;
    /// 게시물 작성자 FK
    private String userNickname;
    /// 카테고리 제목 FK
    private String boardCategoryTitle;
    /// 댓글 목록
    private List<CommentDto> commentDtoList;

    /// Dto -> Entity
    public BoardEntity toEntity() {
        return BoardEntity.builder()
                .boardPostId(this.boardPostId).boardPostTitle(this.boardPostTitle).boardPostContent(this.boardPostContent)
                .boardPostView(this.boardPostView)
                .build();
    }

}
