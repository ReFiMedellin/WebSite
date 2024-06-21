import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { useTranslations } from 'next-intl';

function NetworkModal({
  onNetworkSelect,
}: {
  onNetworkSelect: (value: any) => void;
}) {
  const t = useTranslations('ExclusiveContent.lending.dialog');

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const handleSelectChange = (value: string) => {
    setSelectedNetwork(value);
  };

  const handleConfirm = () => {
    if (selectedNetwork) {
      onNetworkSelect(selectedNetwork);
    }
  };
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('content.header.title')}</DialogTitle>
          <DialogDescription>{t('content.header.description')}</DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('content.select.trigger.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='celo'>Celo</SelectItem>
            <SelectItem value='optimism'>Optimism</SelectItem>
            <SelectItem value='arbitrum'>Arbitrum</SelectItem>
            <SelectItem value='polygon'>Polygon</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={() => {
              handleConfirm();
              toast({
                title: t('content.footer.button.toast.title'),
                description: t('content.footer.button.toast.description'),
              });
            }}
          >
            {t('content.footer.button.text')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { NetworkModal };
