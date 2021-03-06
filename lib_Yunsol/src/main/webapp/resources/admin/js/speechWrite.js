//---------------------DatePicker--------------------------------
$(document).ready(function(){
	$(function(){
		$('#datepicker').datepicker({
			showMonthAfterYear:true, //'default : 월 년'을 '년 월'로 바꿈
			changeYear:true, //년도 선택할 수 있게
			changeMonth:true,
			dateFormat:'yy-mm-dd',
			monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNamesMin:['일','월','화','수','목','금','토']
		});
	});
});
//-------------------------------------------------------------------
function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if(data.userSelectedType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                /* // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용 */
                document.getElementById('sample6_address').value = fullAddr;

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById('sample6_address2').focus();
            }
        }).open();
    }


//----------------------------------------------------------------------------
//관리자 이벤트 등록시 이미지 미리보기
var ImagePreview = (function loadImageFile() {
	if (window.FileReader) {
		var ImagePre; 
		var ImgReader = new window.FileReader();
		var fileType = /^(?:image\/bmp|image\/gif|image\/jpeg|image\/png|image\/x\-xwindowdump|image\/x\-portable\-bitmap)$/i; 

		ImgReader.onload = function (Event) {
			if (!ImagePre) {
				var newPreview = document.getElementById("imagePreview");
				ImagePre = new Image();
				ImagePre.style.width = "200px";
				//ImagePre.style.height = "140px";
				newPreview.appendChild(ImagePre);
			}
			ImagePre.src = Event.target.result;
		};

		return function () {
			var img = document.getElementById("upload").files;

			if (!fileType.test(img[0].type)) { 
				alert("이미지 파일을 업로드 하세요"); 
				return; 
			}
			ImgReader.readAsDataURL(img[0]);
		}
	}
	document.getElementById("imagePreview").src = document.getElementById("upload").value;
})();
