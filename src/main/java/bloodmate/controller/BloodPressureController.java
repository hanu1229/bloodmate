package bloodmate.controller;

import bloodmate.model.dto.bloodpressure.BloodPressureRequestDto;
import bloodmate.service.BloodPressureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/pressure")
public class BloodPressureController {

    private final BloodPressureService bloodPressureService;

    /// 혈압 정보 작성 - C
    @PostMapping("")
    public boolean create(@RequestHeader("Authorization") String token, @RequestBody BloodPressureRequestDto bloodPressureRequestDto) {
        System.out.println(">> BloodPressureController.createBloodPressure start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureRequestDto = " + bloodPressureRequestDto);
        boolean result = bloodPressureService.create(token, bloodPressureRequestDto);
        System.out.println(">> BloodPressureController.createBloodPressure end\n");
        return result;
    }

    /// 혈압 정보 전체 불러오기 - R


    /// 혈압 정보 조건 불러오기 - R


    /// 혈압 정보 수정하기 - U
    @PutMapping("/{bloodPressureId}")
    public boolean update(
            @RequestHeader("Authorization") String token,
            @RequestBody BloodPressureRequestDto bloodPressureRequestDto,
            @PathVariable("bloodPressureId") int bloodPressureId
    ) {
        System.out.println(">> BloodPressureController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureId = " + bloodPressureId);
        System.out.println(">> bloodPressureRequestDto = " + bloodPressureRequestDto);
        boolean result = bloodPressureService.update(token, bloodPressureRequestDto, bloodPressureId);
        System.out.println(">> BloodPressureController.update end\n");
        return result;
    }

    /// 혈압 정보 삭제하기 - D
    @DeleteMapping("/{bloodPressureId}")
    public boolean delete(@RequestHeader("Authorization") String token, @PathVariable("bloodPressureId") int bloodPressureId) {
        System.out.println(">> BloodPressureController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodPressureId = " + bloodPressureId);
        boolean result = bloodPressureService.delete(token, bloodPressureId);
        System.out.println(">> BloodPressureController.delete end\n");
        return result;
    }

}
