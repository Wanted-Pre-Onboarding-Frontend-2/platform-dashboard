import React,{ useEffect } from "react";
import { Box, styled, Input, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil'
import { campaginRequestType } from "../../store/campagin";

const CampaginForm = () => {
  const [isEdit, setIsEdit] = useRecoilState(campaginRequestType);

  useEffect(() => {
    if(isEdit==="edit"){
      setIsEdit("수정하기")
    }else setIsEdit("만들기")
  })

  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Title>광고 {isEdit}</Title>
        <AddForm>
          <InputBox>
            <Input
              placeholder="타이틀"
              inputProps={ariaLabel}
              autoFocus={true}
            />
            <Input placeholder="상태" inputProps={ariaLabel} />
            <Input placeholder="광고 생성일" inputProps={ariaLabel} />
            <Input placeholder="일 희망 예산" inputProps={ariaLabel} />
            <Input placeholder="광고 수익률" inputProps={ariaLabel} />
            <Input placeholder="매출" inputProps={ariaLabel} />
            <Input placeholder="광고 비용" inputProps={ariaLabel} />
          </InputBox>
        </AddForm>
        <ButtonBox>
          <Button
            variant="contained"
            style={{
              borderRadius: 12,
              backgroundColor: "#727272",
              padding: "0 1.5rem",
            }}
            onClick={() => navigate("/campagin-manage")}
          >
            목록으로
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: 12,
              backgroundColor: "#586CF5",
              padding: "0 1.5rem",
            }}
          >
            {isEdit}
          </Button>
        </ButtonBox>
      </Box>
    </>
  );
};

export default CampaginForm;

const Title = styled("header")({
  textAlign: "center",
  fontWeight: "700",
  fontSize: "1.5rem",
  color: "#4e4e4e",
  margin: "1rem 0",
});
const AddForm = styled("div")({
  backgroundColor: "pink",
  width: "30rem",
  height: "36rem",
  background: "#ffffff",
  boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.25)",
  borderRadius: "3rem",
  margin: "0 auto",
  position: "relative",
});
const ButtonBox = styled("div")({
  width: "30rem",
  height: "2.5rem",
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  marginTop: "2rem",
});
const InputBox = styled("div")({
  width: "25rem",
  height: "37rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#acacac",
  padding: "6rem 2rem",
  boxSizing: "border-box",
  margin: "0 auto",
});
