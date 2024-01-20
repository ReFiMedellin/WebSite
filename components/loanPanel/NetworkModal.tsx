import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader
} from '../ui/dialog'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

function NetworkModal ({
  onNetworkSelect
}: {
  onNetworkSelect: (value: any) => void
}) {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [isConfirmed, setisConfirmed] = useState(false)
  const handleSelectChange = (value: string) => {
    setSelectedNetwork(value)
  }

  const handleConfirm = () => {
    if (selectedNetwork) {
      onNetworkSelect(selectedNetwork)
    }
  }
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escoge alguna de las siguientes redes</DialogTitle>
          <DialogDescription>
            De momento las únicas redes disponibles son las siguientes
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder='Select a network' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='celo'>Celo</SelectItem>
            <SelectItem value='optimism'>Optimism</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={() => {
              handleConfirm()
              toast({
                title: 'Tip',
                description: 'Recuerda aceptar el cambio de red en tu billetera'
              })
            }}
          >
            Seleccionar Red
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { NetworkModal }
