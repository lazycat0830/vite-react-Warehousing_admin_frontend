import React, { useState, useEffect, useRef } from "react";
import {  Button, Stack,FileInput,Image } from "@mantine/core";
import { useForm } from "@mantine/form";

const ShowImgForm = ( {
  editRow = {
    com_id: null,
    pro_id: "",
    pro_comName: "",
    pro_homemadeName: "",
    type_id: null,
    pro_cost: null,
    pro_price: null,
    pro_img: null,
    pro_insertDate: "",
    isDelete: null,
    pro_style: ""
  },
  type,
  onSubmit,
}) => {
    const [imgFile, setImgFile] = useState(null);
  const Form = useForm({
    initialValues: editRow,
  });

  const SubmitForm = (ImgAction) => {
    onSubmit(Form.values,imgFile, type,ImgAction);
  };

  return (
    <form>
      <Stack>
      <FileInput
              style={{ width: "100%" }}
              accept="image/png,image/jpeg,image/svg,image/jpg"
              label="變更圖片"
              radius="md"
              size="md"
              clearable
              onChange={setImgFile}
              pb={10}
            />
            
            <div style={{position:"relative"}}>
              <Image
                radius="xs"
                height={300}
                fit="scale-down"
                src={
                  imgFile
                    ? URL.createObjectURL(imgFile)
                    : editRow.pro_img
                }
                alt={`img`}
                fallbackSrc={`https://placehold.co/600x400?text=${!editRow.pro_homemadeName ? editRow.pro_comName : editRow.pro_homemadeName}`}
            />
            {editRow.pro_img && (<Button style={{position:"absolute",bottom:"0px",right:"0px"}} onClick={() => SubmitForm("delImg")} >清除現有圖片</Button>)}
            {imgFile && (<Button style={{position:"absolute",bottom:"0px",right:"0px"}} onClick={() => SubmitForm("editImg")} >更新圖片</Button>)}
            </div>
      </Stack>
    </form>
  );
};


export default ShowImgForm;
