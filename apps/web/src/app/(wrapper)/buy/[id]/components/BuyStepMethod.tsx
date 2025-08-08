import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PaymentMethod } from '@/types';

const variants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.3 } },
};

interface BuyStepMethodParams {
    formStep: 'details' | 'method' | 'delivery' | 'confirm';
    setFormStep: (step: 'details' | 'method' | 'delivery' | 'confirm') => void;
    selectedPaymentMethod: PaymentMethod | null;
    setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
}

export default function BuyStepMethod({
    formStep,
    setFormStep,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
}: BuyStepMethodParams) {
    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
    };

    const handleConfirm = () => {
        if (selectedPaymentMethod) {
            setFormStep('delivery');
        }
    };

    return (
        <>
            <AnimatePresence initial={false}>
                {formStep === 'method' && (
                    <>
                        <motion.div
                            key="payment-methods"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={variants}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                        Select Payment Method
                                    </h2>

                                    <div className="space-y-3">
                                        <div
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                selectedPaymentMethod === 'stripe'
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => handlePaymentMethodSelect('stripe')}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="radio"
                                                    name="payment-method"
                                                    checked={selectedPaymentMethod === 'stripe'}
                                                    onChange={() =>
                                                        handlePaymentMethodSelect('stripe')
                                                    }
                                                    className="text-blue-600"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        Stripe Payment
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Credit card, debit card, and other payment
                                                        methods
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                selectedPaymentMethod === 'swish'
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => handlePaymentMethodSelect('swish')}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="radio"
                                                    name="payment-method"
                                                    checked={selectedPaymentMethod === 'swish'}
                                                    onChange={() =>
                                                        handlePaymentMethodSelect('swish')
                                                    }
                                                    className="text-blue-600"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        Swish
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Mobile payment via Swish app
                                                    </p>
                                                </div>
                                            </div>
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
                                disabled={!selectedPaymentMethod}
                            >
                                Confirm payment method
                            </Button>
                        </div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {formStep !== 'method' && formStep !== 'details' && (
                    <motion.div
                        key="collapsed-button"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div>
                            <Button
                                onClick={() => setFormStep('method')}
                                variant="confirmed_step"
                                className="justify-left"
                            >
                                <span>
                                    Payment Method:{' '}
                                    {selectedPaymentMethod
                                        ? selectedPaymentMethod.charAt(0).toUpperCase() +
                                          selectedPaymentMethod.slice(1)
                                        : 'Not Selected'}{' '}
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
