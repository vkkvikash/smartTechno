import Text from '@components/ui/text';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import FormData from 'form-data';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { submitAPI } from 'src/api/service';
import { toast } from "react-toastify"

const data = {
  title: 'Request A Call',
  description: 'Get a call from us',
  buttonText: 'Request',
};

interface Props {
  className?: string;
  disableBorderRadius?: boolean;
}

type FormValues = {
  mobile: string;
};

const defaultValues = {
  mobile: '',
};

const Subscription: React.FC<Props> = ({ className = 'px-5 sm:px-8 md:px-16 2xl:px-24', disableBorderRadius = false }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { t } = useTranslation();
  const { title, description, buttonText } = data;
  async function onSubmit(input: FormValues) {
    const formValue = new FormData();
    formValue.append("mobile", input.mobile)
    const isAPISucceeded: any = await submitAPI(formValue, "POST", "send/call/back", { 'Content-Type': 'multipart/form-data' });
    if (isAPISucceeded.success) {
      reset({ ...defaultValues })
      toast.success(isAPISucceeded.message)
    } else {
      toast.error("Invalid mobile number")
    }
  }
  return (
    <div
      className={`${className} flex flex-col xl:flex-row justify-center xl:justify-between items-center rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16`}
    >
      <div className="lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0">
        <Text
          variant="mediumHeading"
          // className='mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5'
          className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5"
        >
          {t(`${title}`)}
        </Text>
        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">{t(`${description}`)}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-shrink-0 w-full sm:w-96 md:w-[545px]" noValidate>
        <div className="flex flex-col sm:flex-row items-start justify-end">
          <Input
            disableBorderRadius={disableBorderRadius}
            placeholderKey="Enter Mobile Number"
            type="email"
            variant="solid"
            className="w-full"
            inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-start bg-white"
            {...register("mobile", {
              required: `${t("Mobile number is required")}`,
              pattern: {
                value:
                  /^[6-9]\d{9}$/,
                message: t("Invalid Mobile Number"),
              },
            })}
            errorKey={errors.mobile?.message}
          />
          <Button disableBorderRadius={disableBorderRadius} className="mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0">
            <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Subscription;
