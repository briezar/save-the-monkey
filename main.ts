namespace SpriteKind {
    export const FireFighter = SpriteKind.create()
    export const Plane = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isUsed == 0) {
        isUsed = 1
        playerHealth.value += 50
    }
})
sprites.on_fire_created(function (location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, 5)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim`,
    200,
    true
    )
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 50, function (status) {
    if (game.runtime() > 5000) {
        mySprite.sayText("(I can do this!)", 2000, true)
        if (Tip == 0) {
            game.setDialogFrame(img`
                ..99999999999999999999..
                .9966666666666666666699.
                996661111111111111166699
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                966611111111111111116669
                996661111111111111166699
                .9966666666666666666699.
                ..99999999999999999999..
                `)
            game.showLongText("You can press A to boost adrenaline and heal 50% HP. Can only be used once.", DialogLayout.Bottom)
            Tip += 1
        }
    }
})
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
sprites.on_fire_destroyed(function (location) {
    scene.clearParticleEffectsAtLocation(location)
    tiles.setTileAt(location, assets.tile`burnt tree`)
    music.thump.play()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim0`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`tree fire`, function (sprite, location) {
    sprite.destroy()
    sprites.change_flame_strength_by(location, -1)
})
let projectile: Sprite = null
let Tip = 0
let isUsed = 0
let playerHealth: StatusBarSprite = null
let mySprite: Sprite = null
game.setDialogFrame(img`
    111111111111111111111111111111111111111111111111
    111199911111111111119991111111111111999111111111
    119999999111999911999999911199991199999991119991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199999999999999999999999999999999999999999999991
    199699999999999999999999999999999999999996999991
    199699999999699999999999999999999969999966999991
    199669999999669999999999999999999969999996999691
    166699999999699999999999999699999966999966699691
    196669999996669999699999999699999669999966996691
    199666999999699999699999996669999966999666699691
    166699999966666999669999996699999966699966996661
    196666999966669996666999966666996669999666696691
    196666999966669999669999996699999666999666666661
    166669999666666996666999966666996666966666666669
    196699996666669996666999666669996666666666666669
    966666699666666666666666666666666666666666666669
    966666996666666666666666666666666666666666666669
    966666666666666666666666666666666666666666666669
    999999999999999999999999999999999999999999999999
    `)
game.setDialogTextColor(4)
let plane = sprites.create(assets.image`Fire Plane 2 Left`, SpriteKind.Plane)
plane.setPosition(145, 25)
plane.setVelocity(-50, 0)
plane.setFlag(SpriteFlag.Ghost, true)
game.showLongText("Saving the forest from up in a plane can be hard, but have you ever thought of what the animals down there are doing?", DialogLayout.Center)
game.set_dryness_of_grass(3)
game.set_strength_of_wind(4)
game.set_health_of_trees(7)
tiles.setTilemap(tilemap`Survive forest 1`)
mySprite = sprites.create(assets.image`Monkey Left`, SpriteKind.Player)
controller.moveSprite(mySprite, 70, 70)
scene.cameraFollowSprite(mySprite)
for (let index = 0; index < 4; index++) {
    sprites.create_spreading_fire(assets.tile`tree`, assets.tile`tree fire`)
}
hud.fire_hud(true)
hud.forest_hud(true)
hud.forest_hud_healthy(5)
hud.forest_hud_label("Forest HP")
playerHealth = statusbars.create(20, 3, StatusBarKind.Energy)
playerHealth.setColor(7, 2)
playerHealth.max = 100
playerHealth.attachToSprite(mySprite, 1, 0)
music.playMelody("E B C5 A B G A F ", 120)
isUsed = 0
info.startCountdown(90)
game.onUpdate(function () {
    sprites.random_spread()
})
game.onUpdateInterval(7000, function () {
    plane.setPosition(mySprite.x + 120, randint(10, 150))
})
game.onUpdateInterval(100, function () {
    if (playerHealth.value <= 0) {
        game.over(false, effects.dissolve)
    }
    playerHealth.value += 0.2
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`tree fire`)) {
        playerHealth.value += -0.6
    } else if (mySprite.tileKindAt(TileDirection.Left, assets.tile`burnt tree`)) {
        playerHealth.value += -0.3
    }
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`tree fire`)) {
        playerHealth.value += -0.6
    } else if (mySprite.tileKindAt(TileDirection.Right, assets.tile`burnt tree`)) {
        playerHealth.value += -0.3
    }
    if (mySprite.tileKindAt(TileDirection.Top, assets.tile`tree fire`)) {
        playerHealth.value += -0.6
    } else if (mySprite.tileKindAt(TileDirection.Top, assets.tile`burnt tree`)) {
        playerHealth.value += -0.3
    }
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`tree fire`)) {
        playerHealth.value += -0.6
    } else if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`burnt tree`)) {
        playerHealth.value += -0.3
    }
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`tree fire`)) {
        playerHealth.value += -2
    } else if (mySprite.tileKindAt(TileDirection.Center, assets.tile`burnt tree`)) {
        playerHealth.value += -1
    }
})
game.onUpdateInterval(50 + game.runtime() / 100, function () {
    if (game.runtime() > 10000) {
        projectile = sprites.createProjectileFromSprite(assets.image`water`, plane, 50, randint(0, 30))
        projectile.setKind(SpriteKind.Water)
        projectile.setFlag(SpriteFlag.AutoDestroy, false)
        projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
