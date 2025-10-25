"use client";

import TextInput from "./textInput";
import Category from "./category";
import TextBlock from "./textBlock";
import BoolInput from "./boolInput";
import { useTranslations } from "next-intl";
import LangSelect from "../langSelect";

export default function DD214Form({
  lang
}: {
  lang: string;
}) {
  const t = useTranslations("dd214");

  return (
    <main
      id="dd214"
      role="main"
      className="min-h-screen px-0 py-1 bg-white dark:bg-neutral-900 min-w-max sm:flex sm:flex-col sm:items-center sm:justify-between"
    >
      <div className="w-[40rem] md:w-full md:max-w-screen-lg md:px-4 grid gap-x-1">
        <div className="flex flex-col items-center justify-center">
          <LangSelect lang={lang} pageUrl="/dd214" />
          <p className="font-dg-main text-red-600 text-lg dark:text-red-200 print:hidden">
            {t("topSection.documentFiction")}
          </p>
          <p className="font-dg-main text-dg text-sm dark:text-neutral-200">
            {t("topSection.importantRecord")}
          </p>
          <p className="font-dg-main text-dg text-sm dark:text-neutral-200">
            {t("topSection.safeguard")}
          </p>
        </div>
        <Category name={t("personalData.title")}>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-5">
              <TextInput className="col-span-3" title={t("personalData.names")} />
              <TextInput className="col-span-2" title={t("personalData.serviceNum")} />
            </div>
            <TextInput className="col-span-1 border-r-0" title={t("personalData.ssn")} />
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-5" title={t("personalData.department")} />
              <TextInput className="col-span-2" title={t("personalData.grade")} />
              <TextInput className="col-span-1" title={t("personalData.payGrade")} />
              <TextBlock className="col-span-1" title="6." name={t("personalData.dateOfRank")}/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1" title={t("general.day")} />
              <TextInput className="col-span-1" title={t("general.month")} />
              <TextInput className="col-span-1 border-r-0" title={t("general.year")} />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextBlock className="col-span-3 border-b-0" title={t("personalData.usCitizen")}>
                <div className="flex flex-row gap-5">
                  <BoolInput title={t("general.yes")}/>
                  <BoolInput title={t("general.no")}/>
                </div>
              </TextBlock>
              <TextInput className="col-span-5 border-b-0" title={t("personalData.placeBirth")} />
              <TextBlock className="col-span-1 border-b-0" title="9." name={t("personalData.dateOfBirth")}/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1 border-b-0" title={t("general.day")} />
              <TextInput className="col-span-1 border-b-0" title={t("general.month")} />
              <TextInput className="col-span-1 border-b-0 border-r-0" title={t("general.year")} />
            </div>
          </div>
        </Category>
        <Category name={t("selectiveServiceData.title")} className="h-16" titleClassName="!text-[0.6rem]/[10px]">
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-3 border-b-0 h-16 grid grid-cols-4 grid-rows-3">
                <TextBlock className="col-span-4" title={t("selectiveServiceData.selectiveSN")}/>
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
                <TextInput className="row-span-2 col-span-1" title="" />
              </div>
              <TextInput className="col-span-6 border-b-0 h-16" title={t("selectiveServiceData.selectivePlace")} />
            </div>
            <div className="grid grid-cols-3">
              <TextBlock className="col-span-4 border-r-0" title={t("selectiveServiceData.inductedDate")} />
              <TextInput className="row-span-2 col-span-1 border-b-0" title={t("general.day")} />
              <TextInput className="row-span-2 col-span-1 border-b-0" title={t("general.month")} />
              <TextInput className="row-span-2 col-span-1 border-b-0 border-r-0" title={t("general.year")} />
            </div>
          </div>
        </Category>
        <Category name={<>{t("transferDischarge.title")}<br/>{t("transferDischarge.title2")}</>} titleClassName="!text-sm/[14px]">
          <div className="grid grid-cols-12">
              <TextInput className="col-span-5" title={t("transferDischarge.transferType")}/>
              <TextInput className="col-span-7 border-r-0" title={t("transferDischarge.transferStation")} />
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-8" title={t("transferDischarge.transferReason")} />
              <TextBlock className="col-span-1" title="d." name={t("transferDischarge.transferDate")}/>
            </div>
            <div className="grid grid-cols-3">
              <TextInput className="col-span-1" title={t("general.day")} />
              <TextInput className="col-span-1" title={t("general.month")} />
              <TextInput className="col-span-1 border-r-0" title={t("general.year")} />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <TextInput className="col-span-5" title={t("transferDischarge.lastDuty")} />
              <TextInput className="col-span-4" title={t("transferDischarge.lastService")} />
            </div>
            <TextInput className="col-span-1 border-r-0" title={t("transferDischarge.lastType")} />
          </div>
          <div className="grid grid-cols-4">
            <TextInput className="col-span-3 border-b-0" title={t("transferDischarge.district")} />
            <TextInput className="col-span-1 border-b-0 border-r-0" title={t("transferDischarge.reenlistmentCode")} />
          </div>
        </Category>
        <Category name={t("serviceData.title")} className="">
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-3 border-b-0 h-20 grid grid-cols-3 grid-rows-4">
                <TextBlock className="row-span-2 col-span-4" titleClassName="text-center" title={t("serviceData.terminalDate")}/>
                <TextInput className="row-span-2 col-span-1" title={t("general.day")} />
                <TextInput className="row-span-2 col-span-1" title={t("general.month")} />
                <TextInput className="row-span-2 col-span-1" title={t("general.year")} />
              </div>
              <TextBlock className="col-span-5 h-20" title={t("serviceData.currentService")}>
                <div className="flex flex-row gap-4">
                  <BoolInput title={t("serviceData.enlisted")} textClassName="text-xs"/>
                  <BoolInput title={t("serviceData.reenlisted")} textClassName="text-xs"/>
                  <BoolInput title={t("serviceData.other")} textClassName="text-xs"/>
                </div>
              </TextBlock>
              <TextInput className="col-span-1" title={t("serviceData.currentTerm")}/>
            </div>
            <div className="h-20 grid grid-cols-3 grid-rows-3">
              <TextBlock className="col-span-3 border-r-0" title={t("serviceData.currentDateOfEntry")}/>
              <TextInput className="row-span-2 col-span-1" title={t("general.day")} />
              <TextInput className="row-span-2 col-span-1" title={t("general.month")} />
              <TextInput className="row-span-2 col-span-1 border-r-0" title={t("general.year")} />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5 grid grid-cols-5">
              <TextInput className="col-span-3" title={t("serviceData.priorEnlistments")} />
              <TextInput className="col-span-2" title={t("serviceData.gradeRank")}/>
            </div>
            <TextInput className="col-span-7 border-r-0" title={t("serviceData.placeOfEntryCurrent")}/>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-9">
              <div className="col-span-5 grid grid-rows-2">
                <TextInput className="" title={t("serviceData.homeRecord")} />
                <div className="grid grid-cols-2">
                  <TextInput title={t("serviceData.specialtyNumber")}/>
                  <TextInput title={t("serviceData.dotNumber")}/>
                </div>
              </div>
              <div className="col-span-4 grid grid-cols-3">
                <TextBlock className="col-span-4" title={t("serviceData.statement.title")} />
                <TextBlock className="col-span-1 row-span-3" title="a." name={t("serviceData.statement.creditable")} />
                <TextBlock className="col-span-2" title={t("serviceData.statement.netService")} />
                <TextBlock className="col-span-2" title={t("serviceData.statement.other")} />
                <TextBlock className="col-span-2" title={t("serviceData.statement.total")} />
                <TextBlock className="col-span-4" title={t("serviceData.statement.totalActive")} />
                <TextBlock className="col-span-4" title={t("serviceData.statement.foreign")} />
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-6">
              <TextBlock className="col-span-1" title="" name={t("general.years")} />
              <TextBlock className="col-span-1" title="" name={t("general.months")} />
              <TextBlock className="col-span-1 border-r-0" title="" name={t("general.days")} />
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
            <TextInput className="col-span-4 h-20 border-r-0" title={t("serviceData.rewards")} />
            <TextInput className="col-span-4 h-32 border-r-0 border-b-0" title={t("serviceData.education")} />
          </div>
        </Category>
        <Category name={<>{t("vaServiceData.title")}<br/>{t("vaServiceData.title2")}</>} titleClassName="!text-sm/[14px]">
          <div className="h-full grid grid-cols-12 grid-rows-2">
            <TextInput className="col-span-3 row-span-2 border-b-0" title={t("vaServiceData.nonPay")}/>
            <TextInput className="col-span-2" title={t("vaServiceData.nonPayDays")}/>
            <TextBlock className="col-span-2" title={t("vaServiceData.insurance")}>
              <div className="flex flex-row gap-5">
                <BoolInput title={t("general.yes")}/>
                <BoolInput title={t("general.no")}/>
              </div>
            </TextBlock>
            <TextInput className="col-span-3" title={t("vaServiceData.insuranceAmount")}/>
            <TextInput className="col-span-2 border-r-0" title={t("vaServiceData.insuranceMonth")}/>
            <TextInput className="col-span-2 border-b-0" title={t("vaServiceData.vaClaimNumber")}/>
            <TextBlock className="col-span-7 border-b-0 border-r-0" title={t("vaServiceData.servicemanGroup")}>
              <div className="flex flex-row gap-5">
                <BoolInput title="$10,000"/>
                <BoolInput title="$5,000"/>
                <BoolInput title={t("general.none")}/>
              </div>
            </TextBlock>
          </div>
        </Category>
        <Category name={t("remarks.title")}>
          <TextInput className="border-r-0 border-b-0 h-24" title={t("remarks.input")}/>
        </Category>
        <Category name={t("authentication.title")} className="border-dg border-b-2" titleClassName="py-1.5">
          <div className="h-full grid grid-cols-2 grid-rows-2">
            <TextInput className="" title={t("authentication.permanentAddress")}/>
            <TextInput className="border-r-0" title={t("authentication.signaturePerson")}/>
            <TextInput className="border-b-0" title={t("authentication.authOfficer")}/>
            <TextInput className="border-r-0 border-b-0" title={t("authentication.authOfficerSign")}/>
          </div>
        </Category>
        <div className="grid grid-cols-14">
          <div className="col-span-3 flex flex-row gap-3">
            <p className="row-span-2 flex items-center justify-center font-dg text-2xl tracking-tighter font-bold">DD</p>
            <p className="flex items-center justify-center font-dg text-sm text-center">{t("bottomSection.form")}<br/>{t("bottomSection.date")}</p>
            <p className="row-span-2 flex items-center justify-center font-dg text-2xl tracking-tighter font-bold">214</p>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <div className="">
              <p className="font-dg text-xs/[12px] text-center">{t("bottomSection.previousEditions")}</p>
              <p className="font-dg text-xs/[12px] text-center">{t("bottomSection.previousEditionsDate")}</p>
            </div>
          </div>
          <div className="col-span-3 flex pt-3 justify-center">
            <p className="font-dg text-xs/[8px]">{t("bottomSection.gpo")}</p>
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <div className="">
              <p className="font-dg text-xs/[12px]">{t("bottomSection.army")}</p>
              <p className="font-dg text-xs/[12px]">{t("bottomSection.reportOf")}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="font-dg text-2xl font-bold">2</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-dg-main text-red-600 text-lg dark:text-red-200 print:hidden">
            {t("topSection.documentFiction")}
          </p>
        </div>
      </div>
    </main>
  );
}
