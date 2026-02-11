<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'user_id',
        'file_path',
        'thumbnail_path',
        'description',
        'views_count',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
