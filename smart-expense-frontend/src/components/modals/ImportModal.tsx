import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../ui/Icons";
import Button from "../ui/Button";
import { useUploadStatementMutation } from "../../services/statementApi";
import { toast } from "react-hot-toast";

interface ImportModalProps {
    onClose: () => void;
}

export default function ImportModal({ onClose }: ImportModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatement, { isLoading }] = useUploadStatementMutation();
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
        } else {
            toast.error("Please select a valid CSV file");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadStatement(formData).unwrap();
            setResult(res);
            toast.success("Statement imported successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to import statement");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="w-full max-w-lg bg-[#0f172a]/80 border border-white/10 p-8 rounded-3xl glass-card z-10 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Import Statement</h2>
                        <p className="text-gray-400 text-sm">Upload your bank CSV to sync records</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <Icons.X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {!result ? (
                    <div className="space-y-6">
                        <div
                            className={`
                border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                ${file ? 'border-brand-primary bg-brand-primary/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
              `}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Icons.Upload className={`w-8 h-8 ${file ? 'text-brand-primary' : 'text-gray-500'}`} />
                            </div>
                            <p className="text-white font-medium mb-1">
                                {file ? file.name : "Click to select CSV"}
                            </p>
                            <p className="text-sm text-gray-500">Only CSV files are supported</p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="secondary"
                                onClick={onClose}
                                className="flex-1"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpload}
                                className="flex-1"
                                disabled={!file || isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                                ) : (
                                    "Start Import"
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Icons.CheckCircle className="w-7 h-7 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Import Complete</p>
                                    <p className="text-sm text-gray-400">Successfully processed your statement</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Imported</p>
                                    <p className="text-2xl font-bold text-white">{result.totalImported}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Status</p>
                                    <p className="text-2xl font-bold text-brand-primary italic">Success</p>
                                </div>
                            </div>
                        </div>

                        <Button onClick={onClose} className="w-full">
                            Done
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
