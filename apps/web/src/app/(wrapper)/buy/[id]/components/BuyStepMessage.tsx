import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const variants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
};

interface DeliveryInfo {
    receiptEmail: string;
    giftCardEmail: string;
    message: string;
}

interface BuyStepMessageParams {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    setFormStep: (step: 'details' | 'method' | 'delivery' | 'confirm') => void;
    deliveryInfo: DeliveryInfo;
    setDeliveryInfo: (info: DeliveryInfo) => void;
}

export default function BuyStepMessage({
    formStep,
    setFormStep,
    deliveryInfo,
    setDeliveryInfo,
}: BuyStepMessageParams) {
    const { user, isLoggedIn } = useAuth();

    const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
        setDeliveryInfo({
            ...deliveryInfo,
            [field]: value,
        });
    };

    const handleUseMyEmail = () => {
        if (user?.email) {
            setDeliveryInfo({
                ...deliveryInfo,
                receiptEmail: user.email,
            });
        }
    };

    const handleUseSameEmail = () => {
        setDeliveryInfo({
            ...deliveryInfo,
            giftCardEmail: deliveryInfo.receiptEmail,
        });
    };

    const handleConfirm = () => {
        if (deliveryInfo.receiptEmail && deliveryInfo.giftCardEmail) {
            setFormStep('confirm');
        }
    };

    const isFormValid = deliveryInfo.receiptEmail && deliveryInfo.giftCardEmail;

    return (
        <>
            <AnimatePresence initial={false}>
                {formStep === 'delivery' && (
                    <>
                        <motion.div
                            key="delivery-form"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={variants}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                        Delivery Information
                                    </h2>

                                    <div className="space-y-4">
                                        {/* Receipt Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Receipt Email *
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="email"
                                                    value={deliveryInfo.receiptEmail}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'receiptEmail',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter email for receipt"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                {isLoggedIn && user?.email && (
                                                    <Button
                                                        onClick={handleUseMyEmail}
                                                        variant="outline"
                                                        size="sm"
                                                        className="whitespace-nowrap"
                                                    >
                                                        Use My Email
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Gift Card Recipient Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gift Card Recipient Email *
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="email"
                                                    value={deliveryInfo.giftCardEmail}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'giftCardEmail',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter email for gift card recipient"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <Button
                                                    onClick={handleUseSameEmail}
                                                    variant="outline"
                                                    size="sm"
                                                    className="whitespace-nowrap"
                                                    disabled={!deliveryInfo.receiptEmail}
                                                >
                                                    Same as Receipt
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Optional Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Optional Message
                                            </label>
                                            <textarea
                                                value={deliveryInfo.message}
                                                onChange={(e) =>
                                                    handleInputChange('message', e.target.value)
                                                }
                                                placeholder="Add a personal message to the gift card email..."
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                This message will be included in the email sent with
                                                the gift card.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="pt-4">
                            <Button
                                onClick={handleConfirm}
                                variant="wide_blue"
                                size="lg"
                                disabled={!isFormValid}
                            >
                                Confirm Delivery Information
                            </Button>
                        </div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {formStep !== 'delivery' && formStep !== 'details' && formStep !== 'method' && (
                    <motion.div
                        key="collapsed-button"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div>
                            <Button
                                onClick={() => setFormStep('delivery')}
                                variant="confirmed_step"
                                className="justify-left"
                            >
                                <span>
                                    Delivery:{' '}
                                    {deliveryInfo.receiptEmail ? 'Configured' : 'Not Configured'}
                                    {deliveryInfo.message && ' + Message'}
                                </span>
                                (click to change)
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
