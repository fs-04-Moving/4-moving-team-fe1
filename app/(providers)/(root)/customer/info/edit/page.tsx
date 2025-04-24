'use client';

import CustomerInfoEditTemplate from '@/components/templates/CustomerInfoEditTemplate';

function CustomerInfoEditPage() {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmed: '',
  };

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <CustomerInfoEditTemplate
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
}

export default CustomerInfoEditPage;
