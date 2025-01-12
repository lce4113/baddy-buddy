## API Format

```js
/**

/fetch_player_position?video_id=video_name

returns:
{
    "0": 
    {
        "top": (5, 16),
        "bottom": (7.2, 10)
    },
    "1": 
    {
        "top": (8, 12),
        "bottom": (2.2, 9)
    },
    "2": 
    {
        "top": null,
        "bottom": null
    },
    ...
}


/fetch_birdie_end_pos?video_id=video_name


returns:
{
    "pos": [
        (7.2, 5), 
        (9, 2),
        ...
    ]
}

**/
```
