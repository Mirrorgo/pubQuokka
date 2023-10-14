import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "antd";

type GlobalModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickOk: () => void;
};

function GlobalModal({ visible, setVisible, clickOk }: GlobalModalProps) {
  const [countdown, setCountdown] = useState(3); // 初始倒计时为3秒

  const handleOk = useCallback(() => {
    setVisible(false);
    clickOk(); // 执行传递的 clickOk 方法
  }, [setVisible, clickOk]);

  useEffect(() => {
    if (visible) {
      let timer: NodeJS.Timeout | null = null; // 将 timer 定义在 useEffect 内部

      // 在弹窗显示后开始计时
      timer = setInterval(() => {
        // 倒计时每秒减一
        setCountdown((prevCountdown) => prevCountdown - 1);
        if (countdown === 0) {
          // 如果倒计时结束，执行 handleOk
          handleOk();
          if (timer) {
            clearInterval(timer); // 清除计时器
          }
        }
      }, 1000);

      return () => {
        if (timer) {
          clearInterval(timer); // 清除计时器
        }
      };
    }
  }, [visible, countdown, handleOk]);

  return (
    <Modal
      title="Global Modal"
      open={visible}
      maskClosable={false} // 设置为false，禁用点击遮罩关闭弹窗
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      {`Delete successful. You will be redirected to the login page in ${countdown} seconds...`}
    </Modal>
  );
}

export default GlobalModal;
