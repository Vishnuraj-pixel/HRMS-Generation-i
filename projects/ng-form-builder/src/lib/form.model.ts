export interface FormElement {
  label: string;
  required?: boolean;
  type: string;
  field: string;
  className?: string;
  name: string;
  isEmail?: boolean;
  isMobile?: boolean;
  valueField?: string | number;
  displayField?: string; 
  selectPlaceholder: string;
  collection?: any[];
}

export interface FormInfo {
  isReset: boolean,
  submitBtnLabel: string,
  submitBtnClass: string,
  errorClass: string,
  wrapperClass?: string
}
