import { useState } from 'react';

export const UpdateQuestion = ({
    id,
    initialData,
    onSubmit,
}: {
    id: string;
    initialData: {
        title: string;
        content: string;
        category: string;
        tips: string;
        ai_guidance: string;
        is_active: boolean;
    };
    onSubmit: (id: string, data: typeof initialData) => void;
}) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        const val = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(id, formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ direction: 'rtl', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>עריכת שאלה</h3>

            <label>כותרת:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />

            <label>תוכן:</label>
            <textarea name="content" value={formData.content} onChange={handleChange} />

            <label>קטגוריה:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />

            <label>טיפים:</label>
            <textarea name="tips" value={formData.tips} onChange={handleChange} />

            <label>הנחיות AI:</label>
            <textarea name="ai_guidance" value={formData.ai_guidance} onChange={handleChange} />

            <label>
                פעיל:
                <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">שמור</button>
        </form>
    );
};
