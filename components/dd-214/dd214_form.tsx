import TextInput from "./textInput";
import Category from "./category";
import TextBlock from "./textBlock";
import BoolInput from "./boolInput";

export default function DD214Form() {
  return (
    <main
      id="dd214"
      role="main"
      className="min-h-screen px-0 py-1 bg-white dark:bg-neutral-900 min-w-max sm:flex sm:flex-col sm:items-center sm:justify-between"
    >
      <div className="w-[40rem] md:w-full md:max-w-screen-lg md:px-4 grid gap-x-1">
        <div className="flex flex-col items-center justify-center">
          <p className="font-dg-main text-red-600 text-lg dark:text-red-200 print:hidden">
            THIS DOCUMENT IS A WORK OF FICTION AND IS NOT AN OFFICIAL GOVERNMENT FORM!
          </p>
          <p className="font-dg-main text-dg text-sm dark:text-neutral-200">
            THIS IS AN IMPORTANT RECORD
          </p>
          <p className="font-dg-main text-dg text-sm dark:text-neutral-200">
            SAFEGUARD IT.
          </p>
        </div>
        <Category name="PERSONAL DATA">
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-5">
              <TextInput className="col-span-3" title="1. LAST NAME-FIRST NAME-MIDDLE NAME" />
              <TextInput className="col-span-2" title="2. SERVICE NUMBER" />
            </div>
            <TextInput className="col-span-1 border-r-0" title="3. SOCIAL SECURITY NUMBER" />
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-5" title="4. DEPARTMENT, COMPONENT AND BRANCH OR CLASS" />
              <TextInput className="col-span-2" title="5a. GRADE, RATE OR RANK" />
              <TextInput className="col-span-1" title="5b. PAY GRADE" />
              <TextBlock className="col-span-1" title="6." name="DATE OF RANK"/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1" title="DAY" />
              <TextInput className="col-span-1" title="MONTH" />
              <TextInput className="col-span-1 border-r-0" title="YEAR" />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextBlock className="col-span-3 border-b-0" title="7. U. S. CITIZEN">
                <div className="flex flex-row gap-5">
                  <BoolInput title="YES"/>
                  <BoolInput title="NO"/>
                </div>
              </TextBlock>
              <TextInput className="col-span-5 border-b-0" title="8. PLACE OF BIRTH (City and State or Country)" />
              <TextBlock className="col-span-1 border-b-0" title="9." name="DATE OF BIRTH"/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1 border-b-0" title="DAY" />
              <TextInput className="col-span-1 border-b-0" title="MONTH" />
              <TextInput className="col-span-1 border-b-0 border-r-0" title="YEAR" />
            </div>
          </div>
        </Category>
        <Category name="SELECTIVE SERVICE DATA" className="h-16" titleClassName="!text-xs/[10px]">
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-3 border-b-0 h-16 grid grid-cols-4 grid-rows-3">
                <TextBlock className="col-span-4" title="10a. SELECTIVE SERVICE NUMBER"/>
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
              </div>
              <TextInput className="col-span-6 border-b-0 h-16" title="b. SELECTIVE SERVICE LOCAL BOARD NUMBER, CITY, COUNTY, STATE AND ZIP CODE" />
            </div>
            <div className="grid grid-cols-3">
              <TextBlock className="col-span-4 border-r-0" title="c.&emsp;&emsp;&emsp;&emsp;DATE INDUCTED"/>
              <TextInput className="row-span-2 col-span-1 border-b-0" title="DAY" />
              <TextInput className="row-span-2 col-span-1 border-b-0" title="MONTH" />
              <TextInput className="row-span-2 col-span-1 border-b-0 border-r-0" title="YEAR" />
            </div>
          </div>
        </Category>
        <Category name={<>TRANSFER OR DISCHARGE<br/>DATA</>} titleClassName="!text-sm/[14px]">
          <div className="grid grid-cols-12">
              <TextInput className="col-span-5" title="11a. TYPE OF TRANSFER OR DISCHARGE"/>
              <TextInput className="col-span-7 border-r-0" title="b. STATION OR INSTALLATION AT WITCH EFFECTED" />
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-8" title="c. REASON AND AUTHORITY" />
              <TextBlock className="col-span-1" title="d." name="EFFECTIVE DATE"/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1" title="DAY" />
              <TextInput className="col-span-1" title="MONTH" />
              <TextInput className="col-span-1 border-r-0" title="YEAR" />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-5" title="12. LAST DUTY ASSIGNMENT AND MAJOR COMMAND" />
              <TextInput className="col-span-4" title="13a. CHARACTER OF SERVICE" />
            </div>
            <TextInput className="col-span-1 border-r-0" title="b. TYPE OF CERTIFICATE ISSUED" />
          </div>
          <div className="grid grid-cols-4">
            <TextInput className="col-span-3 border-b-0" title="14. DISTRICT, AREA COMMAND OR CORPS TO WITCH RESERVIST TRANSFERRED" />
            <TextInput className="col-span-1 border-b-0 border-r-0" title="15. REENLISTMENT CODE" />
          </div>
        </Category>
        <Category name="SERVICE DATA" className="">
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-3 border-b-0 h-20 grid grid-cols-3 grid-rows-4">
                <TextBlock className="row-span-2 col-span-4" titleClassName="text-center" title="16. TERMINAL DATE OF RESERVE UMT&S OBLIGATION"/>
                <TextInput className="row-span-2 col-span-1" title="DAY" />
                <TextInput className="row-span-2 col-span-1" title="MONTH" />
                <TextInput className="row-span-2 col-span-1" title="YEAR" />
              </div>
              <TextBlock className="col-span-5 h-20" title="17. CURRENT ACTIVE SERVICE OTHER THAN BY INDUCTION (a. SOURCE OF ENTRY)">
                <div className="flex flex-row gap-4">
                  <BoolInput title="ENLISTED" textClassName="text-xs"/>
                  <BoolInput title="REENLISTED" textClassName="text-xs"/>
                  <BoolInput title="OTHER" textClassName="text-xs"/>
                </div>
              </TextBlock>
              <TextBlock className="col-span-1" title="b." name="TERM OF SERVICE"/>
            </div>
            <div className="h-20 grid grid-cols-3 grid-rows-3">
              <TextBlock className="col-span-3 border-r-0" title="c.&emsp;&emsp;&emsp;&emsp;DATE OF ENTRY"/>
              <TextInput className="row-span-2 col-span-1" title="DAY" />
              <TextInput className="row-span-2 col-span-1" title="MONTH" />
              <TextInput className="row-span-2 col-span-1 border-r-0" title="YEAR" />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5 grid grid-cols-5">
              <TextInput className="col-span-3" title="18. PRIOR REGULAR ENLISTMENTS" />
              <TextInput className="col-span-2" title="19. GRADE, RATE OR RANK AT TIME OF ENTRY INTO CURRENT ACTIVE SVC"/>
            </div>
            <TextInput className="col-span-7 border-r-0" title="20. PLACE OF ENTRY INTO CURRENT ACTIVE SERVICE (City and State)"/>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-5 grid grid-rows-2">
                <TextInput className="" title="21. HOME OF RECORD AT TIME OF ENTRY INTO ACTIVE SERVICE (Street, RFD, City, Country and ZIP Code)" />
                <div className="grid grid-cols-2">
                  <TextInput title="23a. SPECIALTY NUMBER & TITLE"/>
                  <TextInput title="b. RELATED CIVILIAN OCCUPATION AND D.O.T. NUMBER"/>
                </div>
              </div>
              <div className="col-span-4 grid grid-cols-3">
                <TextBlock className="col-span-4" title="22.&emsp;&emsp;&emsp;&emsp;STATEMENT OF SERVICE" />
                <TextBlock className="col-span-1 row-span-3" title="a." name="CREDITABLE FOR BASIC PAY PURPOSES" />
                <TextBlock className="col-span-2" title="(1) NET SERVICE THIS PERIOD" />
                <TextBlock className="col-span-2" title="(2) OTHER SERVICE" />
                <TextBlock className="col-span-2" title="(3) TOTAL" />
                <TextBlock className="col-span-4" title="b. TOTAL ACTIVE SERVICE" />
                <TextBlock className="col-span-4" title="c. FOREIGN AND/OR SEA SERVICE" />
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-6">
              <TextBlock className="col-span-1" title="" name="YEARS" />
              <TextBlock className="col-span-1" title="" name="MONTHS" />
              <TextBlock className="col-span-1 border-r-0" title="" name="DAYS" />
              <TextBlock title=""/>
              <TextBlock title=""/>
              <TextBlock className="border-r-0" title=""/>
              <TextBlock title=""/>
              <TextBlock title=""/>
              <TextBlock className="border-r-0" title=""/>
              <TextBlock title=""/>
              <TextBlock title=""/>
              <TextBlock className="border-r-0" title=""/>
              <TextBlock title=""/>
              <TextBlock title=""/>
              <TextBlock className="border-r-0" title=""/>
              <TextBlock title=""/>
              <TextBlock title=""/>
              <TextBlock className="border-r-0" title=""/>
            </div>
            <TextInput className="col-span-4 h-20 border-r-0" title="24. DECORATIONS, MEDALS, BADGES, COMMENDATIONS, CITATIONS AND COMPANION RIBBONS AWARDED ON AUTHORIZED"/>
            <TextInput className="col-span-4 h-32 border-r-0 border-b-0" title="25. EDUCATION AND TRAINING COMPLETED"/>
          </div>
        </Category>
        <Category name={<>VA AND EMP.<br/>SERVICE DATA</>} titleClassName="!text-sm/[14px]">
          <div className="h-full grid grid-cols-12 grid-rows-2">
            <TextInput className="col-span-3 row-span-2 border-b-0" title="26a. NON-PAY PERIODS TIME LOST"/>
            <TextInput className="col-span-2" title="b. DAYS ACCRUED LEAVE PAID"/>
            <TextBlock className="col-span-2" title="27a. INSURANCE IN FORCE (TRICARE OR USGLI)">
              <div className="flex flex-row gap-5">
                <BoolInput title="YES"/>
                <BoolInput title="NO"/>
              </div>
            </TextBlock>
            <TextInput className="col-span-3" title="b. AMOUNT OF ALLOTMENT"/>
            <TextInput className="col-span-2 border-r-0" title="c. MONTH ALLOTMENT DISCONTINUED"/>
            <TextInput className="col-span-2 border-b-0" title="28. VA CLAIM NUMBER"/>
            <TextBlock className="col-span-7 border-b-0 border-r-0" title="29. SERVICEMEN`S GROUP LIFE INSURANCE COVERAGE">
              <div className="flex flex-row gap-5">
                <BoolInput title="$10,000"/>
                <BoolInput title="$5,000"/>
                <BoolInput title="NONE"/>
              </div>
            </TextBlock>
          </div>
        </Category>
        <Category name="REMARKS">
          <TextInput className="border-r-0 border-b-0 h-24" title="30. REMARKS"/>
        </Category>
        <Category name="AUTHENTICATION" className="border-dg border-b-2" titleClassName="py-1.5">
          <div className="h-full grid grid-cols-2 grid-rows-2">
            <TextInput className="" title="31. PERMANENT ADDRESS FOR MAILING PURPOSES AFTER TRANSFER OR DISCHARGE (Street, RFD, City, Country and ZIP Code)"/>
            <TextInput className="border-r-0" title="32. SIGNATURE OF PERSON BEING TRANSFERRED OR DISCHARGED"/>
            <TextInput className="border-b-0" title="33. TYPED NAME, GRADE AND TITTLE OF AUTHORIZATING OFFICER"/>
            <TextInput className="border-r-0 border-b-0" title="34. SIGNATURE OF OFFICER TRANSFERRED TO SIGN"/>
          </div>
        </Category>
        <div className="grid grid-cols-14">
          <div className="col-span-3 flex flex-row gap-3">
            <p className="row-span-2 flex items-center justify-center font-dg text-2xl tracking-tighter font-bold">DD</p>
            <p className="flex items-center justify-center font-dg text-sm text-center">FORM<br/>1 JUL 77</p>
            <p className="row-span-2 flex items-center justify-center font-dg text-2xl tracking-tighter font-bold">214</p>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <div className="">
              <p className="font-dg text-xs/[12px] text-center">PREVIOUS EDITIONS OF THIS FORM</p>
              <p className="font-dg text-xs/[12px] text-center">ARE OBSOLETE EFFECTIVE 1 JAN 78</p>
            </div>
          </div>
          <div className="col-span-3 flex pt-3 justify-center">
            <p className="font-dg text-xs/[8px]">☆ GPO: 1 888-351-112</p>
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <div className="">
              <p className="font-dg text-xs/[12px]">ARMED FORCED OF THE UNITED STATES</p>
              <p className="font-dg text-xs/[12px]">REPORT OF TRANSFER OR DISCHARGE</p>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="font-dg text-2xl font-bold">2</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-dg-main text-red-600 text-lg dark:text-red-200 print:hidden">
            THIS DOCUMENT IS A WORK OF FICTION AND IS NOT AN OFFICIAL GOVERNMENT FORM!
          </p>
        </div>
      </div>
    </main>
  );
}
