import { Toaster, toast, useSonner } from "sonner";

export default function RollToaster() {
  const { toasts } = useSonner();

  const onRemoveToastsClick = (e: React.MouseEvent<any>) => {
    function removeAllToasts() {
      toasts.forEach((t) => toast.dismiss(t.id));
    }
  };

  return (<>
    <Toaster position="bottom-left" expand={true} visibleToasts={5} />
  </>);
}