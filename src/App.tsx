import { useState, createContext, useContext } from "react";
import "./index.css";

// COMPONENTS
import Background from "./components/Background";
import InputSection from "./components/InputSection";
import Error from "./components/Error";

export interface CardContextProps {
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  CVC: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  setExpiryMonth: React.Dispatch<React.SetStateAction<string>>;
  setExpiryYear: React.Dispatch<React.SetStateAction<string>>;
  setCVC: React.Dispatch<React.SetStateAction<string>>;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  // if (!context) {
  //   throw new Error("useCardContext not in CardContextProvider");
  // }
  return context;
};

function App() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [CVC, setCVC] = useState("");
  const [cardNameError, setCardNameError] = useState("");
  const [cardNumError, setCardNumError] = useState("");
  const [isExpiryMonthError, setisExpiryMonthError] = useState(false);
  const [isExpiryYearError, setisExpiryYearError] = useState(false);
  const [expiryYearError, setExpiryYearError] = useState("");
  const [CVCError, setCVCError] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    setCardNumber(formattedValue);
  };

  const handleCardMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let numericValue = value.replace(/\D/g, "").replace("0", "");

    if (
      numericValue === "" ||
      (numericValue.charAt(0) === "0" && numericValue.length === 2)
    ) {
      setExpiryMonth("");
      return;
    }

    if (Number(numericValue) <= 12 && Number(numericValue) > 0) {
      const formattedValue =
        Number(numericValue) < 10 ? `0${numericValue}` : `${numericValue}`;
      setExpiryMonth(formattedValue);
    }
  };

  const handleChangeYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    setExpiryYear(numericValue);
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    setCVC(numericValue);
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const toTitleCase = (str: string): string => {
      return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    };

    setCardName(toTitleCase(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validCount = 0;
    if (cardName.split(" ").length !== 2) {
      setCardNameError(
        "Please enter your first and last name separated by a space",
      );
    } else {
      setCardNameError("");
      validCount++;
    }

    if (cardNumber.length === 0) {
      setCardNumError("Can't be blank");
    } else if (cardNumber.length < 19) {
      setCardNumError("Please enter 16 digits");
    } else {
      setCardNumError("");
      validCount++;
    }

    if (Number(expiryYear) < 24) {
      setExpiryYearError("Please enter a valid year");
      setisExpiryYearError(true);
    } else {
      setisExpiryYearError(false);
      validCount++;
    }

    if (!expiryMonth) {
      setExpiryYearError("Please enter a valid year");
      setisExpiryMonthError(true);
    } else {
      setisExpiryMonthError(false);
      validCount++;
    }

    if (CVC.length !== 3) {
      setCVCError("Please enter 3 digits");
    } else {
      setCVCError("");
      validCount++;
    }

    if (validCount === 5) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <>
      <CardContext.Provider
        value={{
          cardName,
          cardNumber,
          expiryMonth,
          expiryYear,
          CVC,
          setCardName,
          setCardNumber,
          setExpiryMonth,
          setExpiryYear,
          setCVC,
        }}
      >
        <div className="halfxl:flex halfxl:items-center">
          <Background />
          {!isSuccess ? (
            <form
              className="mt-14 flex flex-col gap-5 p-6 halfxl:ml-96 halfxl:w-[30%]"
              onSubmit={handleSubmit}
            >
              <InputSection>
                <label htmlFor="name-input" className="input-title">
                  Cardholder name
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={handleCardNameChange}
                  placeholder="e.g. Jane Appleseed"
                  id="name-input"
                  className={`input-field capitalize ${cardNameError ? "!border-red-400" : ""}`}
                />
                {cardNameError && <Error text={cardNameError} />}
              </InputSection>
              <InputSection>
                <label htmlFor="card-number-input" className="input-title">
                  Card Number
                </label>
                <input
                  type="text"
                  onChange={handleCardNumChange}
                  value={cardNumber}
                  maxLength={19}
                  id="card-number-input"
                  placeholder="e.g. 1234 5678 9123 0000"
                  className={`input-field ${cardNumError ? "!border-red-400" : ""}`}
                />
                {cardNumError && <Error text={cardNumError} />}
              </InputSection>
              <div className="mb-6 grid grid-cols-last gap-x-4">
                <InputSection>
                  <label htmlFor="exp-date-input" className="input-title">
                    Exp. Date (mm/yy)
                  </label>
                  <div className="grid grid-cols-2 gap-x-3">
                    <input
                      type="text"
                      maxLength={3}
                      value={expiryMonth}
                      placeholder="MM"
                      onChange={handleCardMonthChange}
                      id="exp-date-input"
                      className={`input-field ${isExpiryMonthError ? "!border-red-400" : ""}`}
                    />
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="YY"
                      value={expiryYear}
                      onChange={handleChangeYearChange}
                      className={`input-field ${isExpiryYearError ? "!border-red-400" : ""}`}
                    />
                  </div>
                  {isExpiryMonthError || isExpiryYearError ? (
                    <Error text={expiryYearError} />
                  ) : (
                    ""
                  )}
                </InputSection>
                <InputSection>
                  <label htmlFor="cvc-input" className="input-title">
                    cvc
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 123"
                    value={CVC}
                    maxLength={3}
                    onChange={handleCVCChange}
                    className={`input-field w-full ${CVCError ? "!border-red-400" : ""}`}
                  />
                  {CVCError && <Error text={CVCError} />}
                </InputSection>
              </div>
              <button className="w-full rounded-md bg-neutralC-800 py-3 text-neutralC-50">
                Confirm
              </button>
            </form>
          ) : (
            <main className="items-center halfxl:flex halfxl:w-1/2">
              <div className="flex w-full flex-col items-center justify-center px-6 halfxl:ml-96">
                <svg
                  className="mb-12 mt-20"
                  width="80"
                  height="80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="40" cy="40" r="40" fill="url(#a)" />
                  <path
                    d="M28 39.92 36.08 48l16-16"
                    stroke="#fff"
                    stroke-width="3"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="-23.014"
                      y1="11.507"
                      x2="0"
                      y2="91.507"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#6348FE" />
                      <stop offset="1" stop-color="#610595" />
                    </linearGradient>
                  </defs>
                </svg>

                <h1 className="mb-6 text-4xl uppercase tracking-widest">
                  Thank You!
                </h1>
                <p className="mb-5 text-neutralC-500">
                  We added your card details
                </p>
                <button className="w-full rounded-md bg-neutralC-800 py-3 text-neutralC-50">
                  Continue
                </button>
              </div>
            </main>
          )}
        </div>
      </CardContext.Provider>
    </>
  );
}

export default App;
