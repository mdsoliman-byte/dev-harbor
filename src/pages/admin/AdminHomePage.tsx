import React, { useEffect, useState, FormEvent } from 'react';
import { fetchHeroData, updateHeroData } from '@/services/api';
import { Button } from '@/components/ui/button';

type HeroData = {
    id: number;
    title: string;
    heading: string;
    shortbio: string;
    skills: string[];
    available_for_freelance: boolean;
    profile_image: string;
};

const HeroDataManager: React.FC = () => {
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [formData, setFormData] = useState<HeroData | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchHeroData();
            setHeroData(data);
            setFormData(data);
        };
        getData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            let payload;
            // If an image file is selected, use FormData for file upload.
            if (imageFile) {
                payload = new FormData();
                payload.append('title', formData.title);
                payload.append('heading', formData.heading);
                payload.append('shortbio', formData.shortbio);
                // Send skills as comma separated string
                payload.append('skills', JSON.stringify(formData.skills));;
                payload.append('available_for_freelance', formData.available_for_freelance ? 'true' : 'false');
                payload.append('profile_image', imageFile);
            } else {
                // No file selected so send JSON data.
                payload = formData;
            }
            // Use the updateHeroData function from the API service
            // to send the payload to the backend.

            const response = await updateHeroData(payload);
            // The API endpoint should handle both JSON and multipart/form-data accordingly.
            
            setHeroData(response.data);
            setFormData(response.data);
            setMessage('Hero data updated successfully');
            // Clear the image file from state after successful upload.
            setImageFile(null);
        } catch (err: any) {
            console.error(err);
            setError('Failed to update hero data');
        } finally {
            setLoading(false);
        }
    };

    if (!heroData || !formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Hero Data Manager</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Short Bio</label>
                    <textarea
                        name="shortbio"
                        value={formData.shortbio}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        rows={3}
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={(e) => {
                            const skills = e.target.value.split(',').map(skill => skill.trim());
                            setFormData({ ...formData, skills });
                        }}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 w-full"
                    />
                    {formData.profile_image && !imageFile && (
                        <div className="mt-2">
                            <img src={formData.profile_image} alt="Current Profile" style={{ maxWidth: '200px' }} />
                        </div>
                    )}
                    {imageFile && (
                        <div className="mt-2">
                            <p>Selected file: {imageFile.name}</p>
                        </div>
                    )}
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="available_for_freelance"
                            checked={formData.available_for_freelance}
                            onChange={(e) =>
                                setFormData({ ...formData, available_for_freelance: e.target.checked })
                            }
                            className="mr-2"
                        />
                        Available for Freelance
                    </label>
                </div>
                <div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default HeroDataManager;