import { useEffect, useState } from "react";
import { useGenerateCodeMutation, useValidateCodeMutation } from "../../../shared/api/verifyCode";

const CodeVerificationScreen = ({ email, onSuccess }) => {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [showCode, setShowCode] = useState(false);

    const [generateAndSendCode] = useGenerateCodeMutation();
    const [verifyCode] = useValidateCodeMutation();


    const sendCodeToEmail = async () => {
        if (!email) {
            setMessage("אין אפשרות לשלוח קוד לאימייל.");
            return;
        }
        console.log(`Sending code to email: ${email}`);
        try {
            const res = await generateAndSendCode({ email }).unwrap();
            if (!res?.isSent) {
                setIsCodeSent(false);
            }
            else {
                setMessage("קוד נשלח לאימייל שלך.");
                setIsCodeSent(true);
            }
        } catch (error) {
            console.error("Error sending code:", error);
            setMessage("שגיאה בשליחת הקוד. נא לנסות שנית.");
        }

    }
    useEffect(() => {
        if (!email) {
            setMessage("נא להזין אימייל תקין.");
            setIsCodeSent(false);
            return;
        }
        if (!isCodeSent)
            sendCodeToEmail();
        setIsCodeSent(true);
    }, []);

    const validateCode = async () => {
        if (code.length !== 6) {
            setMessage("נא להזין קוד בן 6 ספרות.");
        }
        else {
            try {
                const response = await verifyCode({ email, code }).unwrap();
                console.log("Response from validateCode:", response);

                if (response && response.valid) {
                    setMessage(response.message || "הקוד תקין. ניתן להמשיך.");
                    onSuccess();
                } else {
                    setMessage(response?.message || "הקוד לא תקין. נא לנסות שנית.");
                }
            } catch (e) {
                console.error("Error validating code:", e);
            }

        }
    }


    return (
        <>
            <div >
                <h3>הזן את קוד האימות שנשלח למייל שלך</h3>
                <button onClick={() => { sendCodeToEmail(); }}  >לא קיבלת קוד? שלח מחדש</button><br />
                <div className="code-verification-input-wrapper">
                    <input
                        type={showCode ? "text" : "password"}
                        maxLength={6}
                        pattern="\d{6}"
                        value={code}
                        onChange={e => {

                            setCode(e.target.value.slice(0, 6));
                        }}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                    />
                    <span onClick={() => setShowCode(s => !s)} title={showCode ? "הסתר קוד" : "הצג קוד"}>
                        {showCode ? (
                            // Eye open SVG
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#333" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="2" />
                            </svg>
                        ) : (
                            // Eye closed SVG
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22" stroke="#333" strokeWidth="2" />
                                <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" stroke="#333" strokeWidth="2" />
                            </svg>
                        )}
                    </span>
                </div>
                {message && (<p className="code-verification-message">{message}</p>)}

                <button onClick={validateCode} className="button" >אשר קוד</button>
            </div>

        </>
    );
};

export default CodeVerificationScreen;