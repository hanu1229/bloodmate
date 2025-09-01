package bloodmate.controller;

import bloodmate.model.dto.bloodsugar.BloodSugarRequestDto;
import bloodmate.model.dto.bloodsugar.BloodSugarResponseDto;
import bloodmate.service.BloodSugarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blood/sugar")
public class BloodSugarController {

    private final BloodSugarService bloodSugarService;

    /// 혈당 작성 - C
    @PostMapping("")
    public boolean createBloodSugar(@RequestHeader("Authorization") String token, @RequestBody BloodSugarRequestDto bloodSugarRequestDto) {
        System.out.println(">> BloodSugarController.createBloodSugar start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        boolean result = bloodSugarService.createBloodSugar(token, bloodSugarRequestDto);
        System.out.println(">> BloodSugarController.createBloodSugar end\n");
        return result;
    }
    /// 혈당 전체 불러오기 - R
    @GetMapping("")
    public List<BloodSugarResponseDto> findAll(@RequestHeader("Authorization") String token) {
        System.out.println(">> BloodSugarController.findAll start");
        System.out.println(">> token = " + token);
        List<BloodSugarResponseDto> result = bloodSugarService.findAll(token);
        System.out.println(">> BloodSugarController.findAll end\n");
        return result;
    }
    /// 혈당 조건 불러오기(조건 : 날짜) - R
    @GetMapping("/date")
    public List<BloodSugarResponseDto> findByDate(
            @RequestHeader("Authorization") String token,
            @RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day
            ) {
        System.out.println(">> BloodSugarController.findByDate start");
        System.out.println("token = " + token);
        System.out.print(">> year = " + year); System.out.print(" / month = " + month); System.out.println(" / day = " + day);
        System.out.println(">> BloodSugarController.findByDate end\n");
        return null;
    }
    /// 혈당 수정하기 - U
    @PutMapping("/{bloodSugarId}")
    public boolean updateBloodSugar(
            @RequestHeader("Authorization") String token,
            @RequestBody BloodSugarRequestDto bloodSugarRequestDto,
            @PathVariable("bloodSugarId") int bloodSugarId
    ) {
        System.out.println(">> BloodSugarController.updateBloodSugar start");
        System.out.println(">> token = " + token);
        System.out.println(">> bloodSugarDto = " + bloodSugarRequestDto);
        System.out.println(">> bloodSugarId = " + bloodSugarId);
        boolean result = bloodSugarService.updateBloodSugar(token, bloodSugarRequestDto, bloodSugarId);
        System.out.println(">> BloodSugarController.updateBloodSugar end\n");
        return true;
    }
    /// 혈당 삭제하기 - D
    @DeleteMapping("/{bloodSugarId}")
    public boolean deleteBloodSugar(@RequestHeader("Authorization") String token, @PathVariable("bloodSugarId") String bloodSugarId) {
        System.out.println(">> BloodSugarController.deleteBloodSugar start");
        System.out.println(">> token = " + token);
        System.out.println(">> BloodSugarController.deleteBloodSugar end\n");
        return true;
    }

}
