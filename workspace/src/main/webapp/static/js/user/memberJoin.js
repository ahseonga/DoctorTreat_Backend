let isIdChecked = false; // 아이디 중복 확인 상태

// 입력 필드의 유효성 검사
const focusBtn = document.querySelectorAll(".member-input-group");
const messages = [
    "아이디가 필요합니다",
    "비밀번호가 필요합니다",
    "비밀번호 확인이 필요합니다",
    "이름이 필요합니다",
    "생년월일이 필요합니다",
    "전화번호가 필요합니다"
];

focusBtn.forEach((inputGroup, index) => {
    const input = inputGroup.querySelector("input");
    const message = inputGroup.querySelector(".memberjoin-Null");

    if (input && message) {
        input.addEventListener("focus", () => {
            input.style.border = "3px solid blue";
            message.textContent = "";
        });

        input.addEventListener("blur", () => {
            if (!input.value) {
                input.style.border = "2px solid red";
                message.textContent = messages[index];
                message.style.color = "red";
            } else {
                input.style.border = "";
                message.textContent = "";
                message.style.color = "";

                // 아이디 유효성 검사
                if (index === 0) {
                    const usernamePattern = /^[a-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`-]{5,20}$/;
                    if (!usernamePattern.test(input.value)) {
                        input.style.border = "2px solid red";
                        message.textContent = "아이디는 5~20자의 영문 소문자, 숫자, 특수기호만 사용 가능합니다.";
                        message.style.color = "red";
                    }
                }

                // 비밀번호 유효성 검사
                if (index === 1) {
                    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
                    if (!passwordPattern.test(input.value)) {
                        input.style.border = "2px solid red";
                        message.textContent = "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.";
                        message.style.color = "red";
                    }
                }

                // 비밀번호 확인 검사
                if (index === 2) {
                    const passwordInput = document.querySelector("#memberPw");
                    if (input.value !== passwordInput.value) {
                        input.style.border = "2px solid red";
                        message.textContent = "비밀번호가 일치하지 않습니다.";
                        message.style.color = "red";
                    }
                }
            }
        });
    }
});

// 비밀번호 토글 기능
const viewicon1 = document.querySelector(".memberjoin-view-first");
const noviewicon1 = document.querySelector(".memberjoin-noview-first");
const passwordInput = document.getElementById('memberPw');

const viewicon2 = document.querySelector(".memberjoin-view-second");
const noviewicon2 = document.querySelector(".memberjoin-noview-second");
const confirmPasswordInput = document.getElementById('memberConfirmPw');

// 첫 번째 비밀번호 토글
if (viewicon1 && noviewicon1) {
    viewicon1.addEventListener("click", () => {
        passwordInput.type = "text";
        viewicon1.style.display = "none";
        noviewicon1.style.display = "block";
    });

    noviewicon1.addEventListener("click", () => {
        passwordInput.type = "password";
        noviewicon1.style.display = "none";
        viewicon1.style.display = "block";
    });
}

// 두 번째 비밀번호 확인 토글
if (viewicon2 && noviewicon2) {
    viewicon2.addEventListener("click", () => {
        confirmPasswordInput.type = "text";
        viewicon2.style.display = "none";
        noviewicon2.style.display = "block";
    });

    noviewicon2.addEventListener("click", () => {
        confirmPasswordInput.type = "password";
        noviewicon2.style.display = "none";
        viewicon2.style.display = "block";
    });
}

// 아이디 중복 확인 버튼 클릭 시 처리
document.querySelector("#member-join-CheckId-Btn").addEventListener("click", function() {
    let memberId = document.querySelector("#memberId").value;

    if (!memberId) {
        alert("아이디를 입력해주세요.");
        return;
    }

    $.ajax({
        url: `${contextPath}/member/memberCheckIdOk.me`,
        type: "GET",
        data: { memberId: memberId },
        success: function(result) {
            console.log(result.trim());
            if (result.trim() === "사용가능") {  // 공백 제거 후 비교
                document.querySelector("#checkIdResult").textContent = "사용 가능한 아이디입니다.";
                isIdChecked = true;
            } else {
                document.querySelector("#checkIdResult").textContent = "중복된 아이디입니다.";
                isIdChecked = false;
            }
        },
        error: function() {
            document.querySelector("#checkIdResult").textContent = "오류가 발생했습니다. 다시 시도해주세요.";
            isIdChecked = false;
        }
    });
});

// 전체 약관동의 체크박스 기능
const agreeAllCheckbox = document.getElementById('agree-all-checkbox');
const agreeCheckboxes = document.querySelectorAll('.agree-checkbox');

agreeAllCheckbox.addEventListener('change', () => {
   agreeCheckboxes.forEach(checkbox => {
      checkbox.checked = agreeAllCheckbox.checked; 
   });
});

// 개별 체크박스가 모두 체크되면 전체 동의 체크박스도 체크
agreeCheckboxes.forEach((checkbox) => {
   checkbox.addEventListener("change", () => {
      const allChecked = Array.from(agreeCheckboxes).every((cb) => cb.checked);
      agreeAllCheckbox.checked = allChecked;
   });
});

// 가입 버튼 클릭 시 폼 제출
document.querySelector(".member-signup-btn").addEventListener("click", function(event) {
   const inputs = document.querySelectorAll("input[required]");
   let allFilled = true;

   // 입력란 확인
   inputs.forEach((input) => {
      if (!input.value) {
         allFilled = false;
      }
   });

   // 체크박스 확인
   const allCheckboxesChecked = Array.from(agreeCheckboxes).every(checkbox => checkbox.checked);

   if (!allFilled || !isIdChecked || !allCheckboxesChecked) {
      event.preventDefault();
      if (!isIdChecked) {
         alert("아이디 중복 확인을 해주세요.");
      } else {
         alert("입력란과 체크박스를 모두 채워주세요.");
      }
   } else {
      document.querySelector("form").submit();
   }
});

// 우편번호 API 사용
function execDaumPostcode() {
   new daum.Postcode({
      oncomplete: function(data) {
         let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
         let extraAddr = '';

         if (data.userSelectedType === 'R' && data.bname && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
         }
         if (data.buildingName && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
         }
         if (extraAddr !== '') {
            addr += ' (' + extraAddr + ')';
         }

         document.getElementById('memberPostcode').value = data.zonecode;
         document.getElementById("memberAddress").value = addr;
         document.getElementById("memberDetailAddress").focus();
      }
   }).open();
}

// 7. 문자 

document.querySelector("#memberPhonech").addEventListener("click", function(event) {
   event.preventDefault(); 
  

    // 인증번호 받기 버튼 클릭 이벤트

		let phoneNumber = document.querySelector("#memberPhone5").value;
		console.log(phoneNumber);
        if (phoneNumber) {
            $.ajax({
                url: contextPath + "/member/joinSMS.me",
                type: "POST",
                data: { phoneNumber: phoneNumber },
                success: function(response) {
                    alert(response);
  
                },
                error: function(xhr, status, error) {
                    alert("오류 발생: " + xhr.responseText);
                }
            });
        } else {
            alert("휴대폰 번호를 입력해주세요.");
        }
});

//8. 인증완료
 document.querySelector("#member-check-com").addEventListener("click", function() {
        // p 태그에 "인증 완료" 텍스트 추가 및 색상 설정
        var phoneCheckElement = document.getElementById("memberphone");
        phoneCheckElement.textContent = "인증 완료";
        phoneCheckElement.style.color = "red"; // 텍스트 색상 빨간색으로 설정
    });