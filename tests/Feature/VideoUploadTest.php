<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VideoUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_video()
    {
        $user = \App\Models\User::factory()->create();
        $file = \Illuminate\Http\UploadedFile::fake()->create('video.mp4', 1000, 'video/mp4');

        $response = $this->actingAs($user)->post('/videos', [
            'video' => $file,
            'description' => 'My first video',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertDatabaseHas('videos', [
            'user_id' => $user->id,
            'description' => 'My first video',
        ]);
        
        // Assert file exists in storage
        \Illuminate\Support\Facades\Storage::disk('public')->assertExists('videos/' . $file->hashName());
    }
}
