package com.example.CarrerLink_backend.dto.request;

import com.example.CarrerLink_backend.dto.AcedemicResultsDTO;
import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentSaveRequestDTO {
    private int studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private List<TechnologyDTO> technologies;
    private List<JobFieldDTO> jobFields;
    private List<AcedemicResultsDTO> acedemicResults;
    private String university;
    private String department;
    private String degree;
    private UserSaveRequestDTO userSaveRequestDTO;
    private String profilePicUrl;
}
