package bloodmate.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BloodSugarService {

    /// 혈당 작성 - C
    /// 혈당 전체 불러오기 - R
    /// 혈당 조건 불러오기(조건 : 날짜) - R
    /// 혈당 수정하기 - U
    /// 혈당 삭제하기 - D

}
