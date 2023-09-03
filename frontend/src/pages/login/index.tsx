import { Button, Image } from "antd";
import React, { FC } from "react";

const Login: FC = () => {
  return (
    <div>
      <div>Create Account</div>
      <Image src="../../../public/image/loginLeft.png" alt="试试" width={200} />
      <Button type="primary">SIGN UP</Button>
    </div>
  );
};

export default Login;
